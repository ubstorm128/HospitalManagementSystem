import { Link } from 'react-router-dom';
import { CrossIcon } from '../components/ui/Icons';

export default function Home() {
  const departments = [
    {
      name: 'Cardiology & Cardiovascular Care',
      lead: 'Dr. Ananya Sharma',
      degrees: 'MD, DM (Cardiology)',
      room: 'OPD Room 102',
      focus: 'Preventive cardiology, echocardiography, hemodynamic monitoring, and acute hypertension control.',
      image: '/assets/central-hospital-of-maracaibo.jpg',
      imageAlt: 'Central Hospital clinical pavilion architectural elevation',
      hours: 'Mon to Sat: 08:30 to 14:00'
    },
    {
      name: 'Orthopedics & Joint Reconstruction',
      lead: 'Dr. Rajesh Verma',
      degrees: 'MS (Orthopedics)',
      room: 'OPD Room 205',
      focus: 'Joint replacement, trauma care, sports injury management, arthroscopy, and mobility recovery.',
      image: '/assets/architectural-drawing-for-a-chapel-and-hospital.jpg',
      imageAlt: 'Historical hospital and chapel architectural drawing, ca. 1767',
      hours: 'Mon to Fri: 09:00 to 16:00'
    },
    {
      name: 'Pediatrics & Adolescent Medicine',
      lead: 'Dr. Priya Nair',
      degrees: 'MD (Pediatrics), DCH',
      room: 'OPD Room 108',
      focus: 'Newborn care, pediatric immunization schedules, adolescent health, and developmental tracking.',
      image: '/assets/architectural-drawing-of-the-hospital-charters-towers.jpg',
      imageAlt: 'Archival drawing of the hospital elevation, 1884',
      hours: 'Mon to Sat: 08:00 to 13:30'
    },
    {
      name: 'Internal & General Medicine',
      lead: 'Dr. Vikram Patel',
      degrees: 'MD (General Medicine)',
      room: 'OPD Room 101',
      focus: 'Chronic disease oversight, infectious disease diagnostics, glycemic protocols, and executive checkups.',
      image: '/assets/greenwich-hospital-the-painted-hall.jpg',
      imageAlt: 'Historical hospital central hall record, 1810',
      hours: 'Mon to Sat: 08:30 to 17:00'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100dvh', color: 'var(--color-text)' }}>
      {/* Top Header - Natural flow without sticky overlap */}
      <header className="motion-reveal motion-delay-1" style={{
        backgroundColor: 'var(--color-surface)',
        padding: '1.25rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div className="motion-reveal motion-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="brand-icon">
            <CrossIcon size={20} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.1 }}>
              Apex St. Jude Clinical Health Network
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', marginTop: '0.2rem' }}>
              CareLedger Operating System
            </div>
          </div>
        </div>

        <div className="motion-reveal motion-delay-2" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
            Emergency Intake: <strong style={{ color: 'var(--color-text)' }}>+91 11 2658 8500</strong>
          </span>
          <Link to="/login" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
            Open Clinical Workspace
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem' }}>
        {/* HERO SECTION: Split Stage Blueprint (Striped card beside room) */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
          minHeight: '82svh',
          alignItems: 'stretch',
          marginBottom: '6rem'
        }}>
          {/* Left: Printed Card */}
          <div className="motion-reveal motion-delay-2" style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              {/* Institution Stripe */}
              <div className="motion-reveal motion-delay-2" style={{ display: 'flex', gap: '6px', height: '12px', width: '120px', marginBottom: '2.5rem' }}>
                <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', borderRadius: '2px' }} />
                <div style={{ flex: 1, backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }} />
                <div style={{ flex: 1, backgroundColor: 'var(--color-primary-light)', borderRadius: '2px' }} />
                <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', borderRadius: '2px' }} />
              </div>

              <div className="motion-reveal motion-delay-3" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
                Apex St. Jude Clinical Health Network · Est. 1884
              </div>

              <h1 className="motion-reveal motion-delay-3" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 5vw, 4.25rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                maxWidth: '16ch'
              }}>
                Clinical Care. Exact Ledger.
              </h1>

              <p className="motion-reveal motion-delay-4" style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-text)',
                maxWidth: '46ch',
                marginBottom: '2.5rem'
              }}>
                A verified clinical operating system serving inpatient wings, outpatient doctor queues, and transparent diagnostic billing records without administrative delay.
              </p>

              <div className="motion-reveal motion-delay-5" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="/login" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  Open Clinical Workspace
                </Link>
                <a href="#pavilions" className="btn btn-secondary" style={{ padding: '14px 24px', fontSize: '1rem' }}>
                  Explore Specialty Wings
                </a>
              </div>
            </div>

            {/* Metrics Panel separated by tone, zero hairlines */}
            <div className="motion-reveal motion-delay-6" style={{
              display: 'flex',
              gap: '2rem',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: 'var(--radius-sm)',
              marginTop: '2rem'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>Level 1</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>Emergency Triage</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>4 Wings</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>Outpatient Clinics</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>100%</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>Audit Trail Traceable</div>
              </div>
            </div>
          </div>

          {/* Right: Archival Elevation Photograph */}
          <div className="motion-reveal motion-delay-3" style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: '#101c24',
            minHeight: '440px'
          }}>
            <img
              src="/assets/architectural-drawing-of-the-hospital-charters-towers.jpg"
              alt="Archival elevation drawing of the Hospital facility, 1884"
              className="photo-drift"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.88,
                filter: 'contrast(105%)'
              }}
              decoding="async"
            />
            <div className="motion-reveal motion-delay-4" style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.25rem 1.5rem',
              backgroundColor: 'rgba(16, 28, 36, 0.88)',
              color: '#ffffff'
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
                Apex St. Jude Hospital Grounds & Pavilion Elevation
              </div>
              <div style={{ fontSize: '0.875rem', color: '#c7d5de', marginTop: '0.25rem' }}>
                Archival Record (1884), CC BY 4.0 via Wikimedia Commons.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Intro (Narrow column, empty field) */}
        <section style={{
          padding: '4rem 0',
          marginBottom: '5rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 360px) 1fr',
          gap: '3rem'
        }}>
          <div className="motion-reveal motion-delay-2">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 600,
              lineHeight: 1.15,
              margin: 0
            }}>
              Clinical Operating Standards
            </h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', marginTop: '0.5rem' }}>
              Principles of Practice
            </div>
          </div>

          <div style={{ maxWidth: '64ch' }}>
            <p className="motion-reveal motion-delay-3" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem', fontWeight: 500 }}>
              The hospital operates on an unbroken ledger where every consultation, diagnostic prescription, and administrative transfer is immediately verifiable by clinical staff and patients alike.
            </p>
            <p className="motion-reveal motion-delay-4" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem', color: 'var(--color-text)' }}>
              Outpatient consultation queues synchronize directly with attending specialists. Intake counters log vital stats at arrival, routing urgent triages to active treatment bays without paperwork bottlenecks.
            </p>
            <p className="motion-reveal motion-delay-5" style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
              Each medical record is preserved under strict access roles. Specialists review longitudinal history, reception desks coordinate appointments, and billing departments reconcile statements in real time.
            </p>
          </div>
        </section>

        {/* SECTION 2: Features (Four Clinical Pavilions) */}
        <section id="pavilions" style={{
          padding: '4rem 0',
          marginBottom: '6rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 320px) 1fr',
            gap: '3rem',
            alignItems: 'start'
          }}>
            <div className="motion-reveal motion-delay-2">
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 600,
                lineHeight: 1.15,
                margin: 0
              }}>
                Four Clinical Pavilions
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-secondary)', marginTop: '0.75rem', lineHeight: 1.5 }}>
                Dedicated outpatient and diagnostic consultation wings staffed by board-certified physicians.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/login" className="btn btn-secondary" style={{ padding: '10px 18px', fontSize: '0.875rem' }}>
                  Book Consultation Desk →
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {departments.map((dept, index) => (
                <div
                  key={dept.name}
                  className={`motion-reveal motion-delay-${(index % 4) + 2}`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.75rem',
                    display: 'grid',
                    gridTemplateColumns: index % 2 === 0 ? '160px 1fr' : '1fr 160px',
                    gap: '1.75rem',
                    alignItems: 'center'
                  }}
                >
                  {index % 2 === 0 && (
                    <img
                      src={dept.image}
                      alt={dept.imageAlt}
                      className="photo-drift"
                      style={{
                        width: '160px',
                        height: '130px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        filter: 'contrast(105%)'
                      }}
                      decoding="async"
                    />
                  )}

                  <div>
                    <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.35rem' }}>
                      {dept.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
                      {dept.lead} · {dept.degrees} · {dept.room}
                    </div>
                    <p style={{ fontSize: '1rem', lineHeight: 1.5, color: 'var(--color-text)', margin: '0 0 0.75rem 0' }}>
                      {dept.focus}
                    </p>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>
                      Operating Hours: <strong>{dept.hours}</strong>
                    </div>
                  </div>

                  {index % 2 !== 0 && (
                    <img
                      src={dept.image}
                      alt={dept.imageAlt}
                      className="photo-drift"
                      style={{
                        width: '160px',
                        height: '130px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        filter: 'contrast(105%)'
                      }}
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Live Clinical Ledger Fragment (Showcase) */}
        <section className="motion-reveal motion-delay-3" style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '3rem 2.5rem',
          marginBottom: '5rem'
        }}>
          <div style={{ maxWidth: '800px', marginBottom: '2rem' }}>
            <h2 className="motion-reveal motion-delay-2" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 600,
              lineHeight: 1.15,
              margin: '0 0 0.5rem 0'
            }}>
              Integrated Triage Ledger
            </h2>
            <p className="motion-reveal motion-delay-3" style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>
              Live operational preview of current patient admissions, specialty consultation status, and prescription ledger balances.
            </p>
          </div>

          {/* Genuine interface fragment with data-ui attribute */}
          <div data-ui="ledger-preview" className="motion-reveal motion-delay-4" style={{
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden'
          }}>
            <div className="table-responsive">
              <table className="table" style={{ margin: 0 }}>
                <thead>
                  <tr>
                    <th>Patient Identifier</th>
                    <th>Specialty Wing</th>
                    <th>Consulting Physician</th>
                    <th>Triage Category</th>
                    <th>Queue Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>P-2026-0814</td>
                    <td>Cardiology & Cardiovascular</td>
                    <td>Dr. Ananya Sharma</td>
                    <td>Urgent Triage (Chest Pain)</td>
                    <td><span className="badge badge-pending">Consulting</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>P-2026-0815</td>
                    <td>Orthopedics & Joint Care</td>
                    <td>Dr. Rajesh Verma</td>
                    <td>Post-Op Rehabilitation</td>
                    <td><span className="badge badge-confirmed">Scheduled</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>P-2026-0816</td>
                    <td>Pediatrics & Adolescent</td>
                    <td>Dr. Priya Nair</td>
                    <td>Immunization Schedule</td>
                    <td><span className="badge badge-confirmed">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: Archival & Institution Attribution */}
      <footer className="motion-reveal motion-delay-2" style={{
        backgroundColor: 'var(--color-surface)',
        padding: '3rem 2.5rem 2rem 2.5rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          <div className="motion-reveal motion-delay-2">
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Apex St. Jude Clinical Health Network
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', lineHeight: 1.5, margin: 0 }}>
              Comprehensive inpatient, outpatient, and emergency healthcare facilities operated under clinical governance standards.
            </p>
          </div>

          <div className="motion-reveal motion-delay-3">
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
              Emergency Intake & Contact
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
              Central Hospital Desk: +91 11 2658 8500<br />
              Emergency Wing: Ward 1, Level G, Main Pavilion<br />
              OPD Hours: Monday to Saturday, 08:00 to 17:00
            </div>
          </div>

          <div className="motion-reveal motion-delay-4">
            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
              Archival Art Credits & Provenance
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', lineHeight: 1.5 }}>
              "Architectural Drawing for a Chapel and Hospital" (ca. 1767, The Met, CC0)<br />
              "Architectural drawing of the Hospital, Charters Towers" (1884, Wikimedia Commons, CC BY 4.0)<br />
              "Central Hospital of Maracaibo" (2013, Wikimedia Commons, CC0)<br />
              "Greenwich Hospital, The Painted Hall" (1810, The Met, CC0)
            </div>
          </div>
        </div>

        <div className="motion-reveal motion-delay-5" style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.875rem',
          color: 'var(--color-secondary)'
        }}>
          <div>
            © 2026 CareLedger Clinical OS. All hospital records and logs governed by clinical privacy standards.
          </div>
          <div>
            <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Staff & Patient Login Desk →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}